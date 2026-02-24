import { useState, useMemo } from "react";
import Header from "../components/Header/Header";
import Aside from "../components/sideBar/Aside";
import InferenceEngineCard from "../components/AISettings/InferenceEngineCard";
import ModelSelectionCard from "../components/AISettings/ModelSelectionCard";
import AdvancedTuningCard from "../components/AISettings/AdvancedTuningCard";
import { FaCircleChevronRight } from "react-icons/fa6";
import { MdInfo } from "react-icons/md";

const AiPreferencesPage = () => {
  /* -----------------------------
     Configuration State
  ------------------------------ */
  const [inferenceConfig, setInferenceConfig] = useState({
    localInference: true,
    confidence: 85.5,
    consensusEnabled: false
  });

  const [models, setModels] = useState([
    {
      id: "cxn-pro",
      name: "Chest-X Net Pro",
      version: "v4.2.1",
      type: "Pulmonary Radiography",
      status: "Active"
    },
    {
      id: "neuro-diff",
      name: "NeuroMRI-Diff",
      version: "v1.9.0",
      type: "Brain Lesion Detection",
      status: "Downloading (64%)"
    },
    {
      id: "cardio-scan",
      name: "CardioScan-AI",
      version: "v2.1.0",
      type: "Echocardiogram Analysis",
      status: "Offline"
    }
  ]);

  /* -----------------------------
     Derived State
  ------------------------------ */
  const hasExperimentalFeaturesEnabled = useMemo(
    () => inferenceConfig.consensusEnabled,
    [inferenceConfig.consensusEnabled]
  );

  /* -----------------------------
     Handlers
  ------------------------------ */
  const updateInferenceConfig = (key, value) => {
    setInferenceConfig((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Placeholder for persistence layer
    // API call, validation, audit logging, etc.
    console.log("Saving AI preferences", {
      inferenceConfig,
      models
    });
  };

  const handleDiscard = () => {
    // In a real system, this would restore from last persisted snapshot
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex">
      <Aside />

      <main className="flex-1 flex flex-col min-w-0">
        <Header />

        <section className="flex-1 p-8 pb-12">
          {/* Breadcrumbs */}
          <nav
            className="flex items-center gap-2 mb-6 text-sm text-slate-500"
            aria-label="Breadcrumb"
          >
            <a href="#" className="hover:text-primary">
              Settings
            </a>
            <FaCircleChevronRight className="text-xs" />
            <span className="font-medium text-slate-900 dark:text-slate-200 tracking-wide">
              AI Preferences
            </span>
          </nav>

          {/* Page Header */}
          <header className="mb-8">
            <h2 className="text-3xl font-black mb-2">
              AI Diagnostic Preferences
            </h2>
            <p className="max-w-2xl text-slate-500">
              Configure how the inference engine processes patient data,
              evaluates confidence thresholds, and applies experimental
              consensus logic.
            </p>
          </header>

          {/* Settings Grid */}
          <div className="grid gap-6">
            <InferenceEngineCard
              localInference={inferenceConfig.localInference}
              setLocalInference={(val) =>
                updateInferenceConfig("localInference", val)
              }
              confidence={inferenceConfig.confidence}
              setConfidence={(val) =>
                updateInferenceConfig("confidence", val)
              }
            />

            <ModelSelectionCard
              models={models}
              setModels={setModels}
            />

            <AdvancedTuningCard
              consensusEnabled={inferenceConfig.consensusEnabled}
              setConsensusEnabled={(val) =>
                updateInferenceConfig("consensusEnabled", val)
              }
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border-dark p-4">
          <div className="mx-auto flex justify-between items-center px-6 gap-6">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <MdInfo />
              <span>
                Changes are applied immediately to the inference engine.
                {hasExperimentalFeaturesEnabled && (
                  <span className="text-orange-500 font-medium ml-1">
                    Experimental features enabled.
                  </span>
                )}
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleDiscard}
                className="
                  px-6 py-2 rounded-lg
                  text-sm font-bold
                  border border-slate-300 dark:border-slate-700
                  hover:bg-slate-100 dark:hover:bg-slate-800
                  transition-all
                "
              >
                Discard Changes
              </button>

              <button
                onClick={handleSave}
                className="
                  px-8 py-2 rounded-lg
                  text-sm font-bold
                  bg-primary text-white
                  hover:bg-primary/90
                  transition-all
                "
              >
                Save Changes
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AiPreferencesPage;
