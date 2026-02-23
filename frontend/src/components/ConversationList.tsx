import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  CircularProgress,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { Conversation, ConversationData } from '../types';

interface ConversationListProps {
  onConversationSelect?: (conversationId: string) => void;
  currentConversationId?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  onConversationSelect,
  currentConversationId = 'default'
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const response = await fetch('/api/conversations');
      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConversationClick = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/conversation/${conversationId}`);
      const data: ConversationData = await response.json();

      if (data.error) {
        alert('Error loading conversation');
        return;
      }

      // Update localStorage
      localStorage.setItem('currentConversationId', conversationId);

      // Notify parent component
      onConversationSelect?.(conversationId);

    } catch (error) {
      console.error('Error loading conversation:', error);
      alert('Error loading conversation');
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <ChatIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" component="h2">
          Conversations
        </Typography>
      </Box>

      <List sx={{ maxHeight: '400px', overflow: 'auto' }}>
        <ListItem disablePadding>
          <ListItemButton
            selected={currentConversationId === 'default'}
            onClick={() => handleConversationClick('default')}
            sx={{
              borderRadius: 1,
              mb: 1,
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
              },
            }}
          >
            <ListItemText
              primary="New Conversation"
              secondary="Start fresh"
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: currentConversationId === 'default' ? 'bold' : 'normal',
              }}
              secondaryTypographyProps={{
                variant: 'caption',
              }}
            />
          </ListItemButton>
        </ListItem>

        {conversations.map((conversation) => (
          <ListItem key={conversation.id} disablePadding>
            <ListItemButton
              selected={currentConversationId === conversation.id}
              onClick={() => handleConversationClick(conversation.id)}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                },
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" noWrap sx={{ flex: 1 }}>
                      Conversation
                    </Typography>
                    <Chip
                      label={`${conversation.message_count} msgs`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem', height: '20px' }}
                    />
                  </Box>
                }
                secondary={formatDate(conversation.timestamp)}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: currentConversationId === conversation.id ? 'bold' : 'normal',
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {conversations.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          No previous conversations
        </Typography>
      )}
    </Box>
  );
};

export default ConversationList;