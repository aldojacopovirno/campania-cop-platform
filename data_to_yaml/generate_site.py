
import os
import pandas as pd
import google.generativeai as genai
import yaml
from dotenv import load_dotenv

load_dotenv()

# CONFIGURATION
DATA_FILE = 'data.csv'
OUTPUT_FILE = 'site_config.yaml'

def get_data_summary(df):
    """Generates a summary of the pandas DataFrame."""
    summary = []
    summary.append("--- DataFrame Info ---")
    
    # Capture info() output
    import io
    buffer = io.StringIO()
    df.info(buf=buffer)
    summary.append(buffer.getvalue())
    
    summary.append("\n--- Descriptive Statistics ---")
    summary.append(df.describe(include='all').to_string())
    
    summary.append("\n--- First 5 Rows ---")
    summary.append(df.head().to_string())
    
    return "\n".join(summary)

def generate_yaml_prompt(data_summary):
    """Constructs the prompt for Gemini."""
    return f"""
    You are an expert environmental analyst and meteorologist.
    Your goal is to analyze the provided weather data summary and generate a YAML configuration for a comprehensive text-based report.
    
    Here is the summary of the environmental data:
    {data_summary}
    
    Based on this data, please:
    1. Identify key weather patterns, trends, and anomalies.
    2. CRITICAL: Analyze the data for potential HEATWAVES or other hazardous conditions. 
       - If you see sustained high temperatures (e.g., >30°C or rising trends), flag this prominently.
    3. Generate a VALID YAML string that represents a textual report.
    
    IMPORTANT: THE CONTENT OF THE REPORT MUST BE IN ITALIAN.
    
    The YAML schema should be:
    
    title: "Titolo del Report"
    description: "Breve riassunto del periodo e della località (se dedotta)"
    alerts:
      - level: "critical" | "warning" | "info"
        message: "Testo dell'avviso (es. 'Ondata di calore rilevata: Temperature superiori a 35°C per 3 giorni consecutivi')"
    sections:
      - title: "Titolo Sezione"
        content: "Analisi testuale dettagliata IN ITALIANO. Use markdown formatting *italics*, **bold** if needed."
        recommendation: "Consiglio pratico basato sull'analisi IN ITALIANO."

    IMPORTANT: 
    - Output ONLY the YAML content. Do not include markdown code blocks (```yaml ... ```).
    - Ensure the YAML is valid.
    - NO CHARTS. Focus on clear, actionable text.
    - LANGUAGE: ITALIAN.
    """

def main():
    # 1. Load Data
    if not os.path.exists(DATA_FILE):
        print(f"Error: {DATA_FILE} not found.")
        return

    try:
        df = pd.read_csv(DATA_FILE)
        print("Data loaded successfully.")
    except Exception as e:
        print(f"Error loading CSV: {e}")
        return

    # 2. Summarize Data
    summary = get_data_summary(df)
    print("Data summary generated.")

    # 3. Setup Gemini
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print("Error: GOOGLE_API_KEY environment variable not set.")
        return
        
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-flash-latest')

    # 4. Generate Content
    prompt = generate_yaml_prompt(summary)
    print("Sending prompt to Gemini...")
    
    try:
        response = model.generate_content(prompt)
        yaml_content = response.text
        
        # Clean up code blocks if present
        if "```yaml" in yaml_content:
            yaml_content = yaml_content.replace("```yaml", "").replace("```", "")
        elif "```" in yaml_content:
             yaml_content = yaml_content.replace("```", "")
             
        # Validate YAML
        try:
            parsed_yaml = yaml.safe_load(yaml_content)
            # Write to file
            with open(OUTPUT_FILE, 'w') as f:
                yaml.dump(parsed_yaml, f, sort_keys=False)
            print(f"Successfully generated {OUTPUT_FILE}")
            print(yaml_content)
        except yaml.YAMLError as e:
            print(f"Error parsing generated YAML: {e}")
            print("Raw output:")
            print(yaml_content)
            
    except Exception as e:
        print(f"Error communicating with Gemini: {e}")

if __name__ == "__main__":
    main()
