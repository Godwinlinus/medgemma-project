import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { PatientInfo } from '../types';

interface PatientInfoFormProps {
  onPatientInfoChange?: (info: PatientInfo) => void;
}

const PatientInfoForm: React.FC<PatientInfoFormProps> = ({ onPatientInfoChange }) => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: '',
    age: '',
    gender: '',
    symptoms: '',
    medicalHistory: '',
  });

  const handleChange = (field: keyof PatientInfo) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string } }
  ) => {
    const newInfo = {
      ...patientInfo,
      [field]: event.target.value,
    };
    setPatientInfo(newInfo);
    onPatientInfoChange?.(newInfo);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/patient-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id: localStorage.getItem('currentConversationId') || 'default',
          patient_info: patientInfo,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Patient information updated successfully!');
      } else {
        alert('Error updating patient information');
      }
    } catch (error) {
      console.error('Error updating patient info:', error);
      alert('Error updating patient information');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" component="h2">
          Patient Information
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Name"
          value={patientInfo.name}
          onChange={handleChange('name')}
          placeholder="Enter your full name"
          variant="outlined"
          size="small"
        />

        <TextField
          fullWidth
          label="Age"
          type="number"
          value={patientInfo.age}
          onChange={handleChange('age')}
          placeholder="Enter your age"
          variant="outlined"
          size="small"
          inputProps={{ min: 0, max: 150 }}
        />

        <FormControl fullWidth size="small">
          <InputLabel>Gender</InputLabel>
          <Select
            value={patientInfo.gender}
            onChange={handleChange('gender')}
            label="Gender"
          >
            <MenuItem value="">
              <em>Select gender</em>
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
            <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Current Symptoms"
          multiline
          rows={3}
          value={patientInfo.symptoms}
          onChange={handleChange('symptoms')}
          placeholder="Describe your current symptoms (e.g., headache, fever, cough, fatigue...)"
          variant="outlined"
          size="small"
        />

        <TextField
          fullWidth
          label="Medical History"
          multiline
          rows={3}
          value={patientInfo.medicalHistory}
          onChange={handleChange('medicalHistory')}
          placeholder="Any relevant medical history, allergies, medications, or previous conditions..."
          variant="outlined"
          size="small"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 1 }}
        >
          Update Information
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />
    </Box>
  );
};

export default PatientInfoForm;