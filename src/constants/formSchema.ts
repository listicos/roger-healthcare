export const formSchema = {
  "VITAL_SIGNS": {
    "type": "object",
    "properties": {
      "n_fahrenheit_6c6175": {
         "type": "text",
         "description": "What was the patient's temperature in Fahrenheit?"
      },
      "r_measurement_71e031": {
         "type": "typeahead",
         "description": "Select the method used for temperature measurement",
         "enum": [
           "ORAL",
           "AXILLARY",
           "OTIC",
           "TEMPORAL"
         ]
      },
      "m_have_67e23f": {
         "type": "multiselect",
         "description": "What characteristics did the patient's pulse have?",
         "items": [
           "ABSENT",
           "IRREGULAR",
           "THREADY",
           "WEAK",
           "WNL"
         ]
      },
      "n_pulse_rate_34e2f1": {
        "type": "text",
        "description": "What is the patient's pulse rate (BPM)?",
        "hidden": true
      }
    },
    "if": {
        "properties": {
          "m_have_67e23f": { "const": "IRREGULAR" }
        }
      },
      // biome-ignore lint/suspicious/noThenProperty: just for the schema
      "then": {
        "properties": {
          "n_pulse_rate_34e2f1": { "hidden": false }
        }
      }
  },
};
