import pandas as pd
import os
import json
from tqdm import tqdm

"""
This script processes ODS files and converts them to JSON with the following functionalities:
- Remove unnecessary spaces, treating cells with only spaces as empty strings.
- Parse "similarTerms" into an array, splitting by full-width spaces.
- Trim trailing full-width spaces from "pronunciation" and "audioFileName".
- Remove extraneous brackets from "sentenceZh" values.
- Parse "definitions" into an ordered list format if it contains numbered markers.
- Parse "examples" into structured arrays of dictionaries with "sentenceZh" and "sentenceHak" keys.
- Split "pronunciation" into "standardPronunciation" (first sequence) and "pronunciationNotes" (notes after the first sequence).
- Rename columns to standardized English keys.
- Display a progress bar to track the conversion process.
"""

def parse_multiline_cell(cell_value):
    """
    Parse a cell value with multiple lines into an array.

    Parameters:
        cell_value (str): The cell value to parse.

    Returns:
        list: Parsed array of lines.
    """
    if pd.isna(cell_value):
        return []
    return [line.strip() for line in str(cell_value).splitlines() if line.strip()]

def parse_example_cell(cell_value):
    """
    Parse the "examples" column into an array of dictionaries.

    Parameters:
        cell_value (str): The cell value to parse.

    Returns:
        list: Array of dictionaries with "sentenceZh" and "sentenceHak" keys.
    """
    if pd.isna(cell_value):
        return []

    examples = []
    for line in str(cell_value).splitlines():
        if "例：" in line:
            parts = line.split("例：", 1)[1].split("。", 1)
            if len(parts) == 2:
                examples.append({
                    "sentenceHak": parts[0].strip() + "。",
                    "sentenceZh": parts[1].strip().lstrip('(').rstrip(')')
                })
    return examples

def parse_similar_terms(cell_value):
    """
    Parse the "similarTerms" column into an array by splitting full-width spaces.

    Parameters:
        cell_value (str): The cell value to parse.

    Returns:
        list: Array of terms.
    """
    if pd.isna(cell_value) or str(cell_value).strip() == "":
        return []
    return [term.strip() for term in str(cell_value).split("\u3000") if term.strip()]

def parse_definitions(cell_value):
    """
    Parse the "definitions" column into an array if it contains ordered list markers.

    Parameters:
        cell_value (str): The cell value to parse.

    Returns:
        list: Parsed definitions.
    """
    if pd.isna(cell_value):
        return []

    definitions = []
    for part in str(cell_value).split("\u3000"):
        if part.strip().startswith(tuple(str(i) + '.' for i in range(1, 10))):
            definitions.append(part.split('.', 1)[1].strip())
        else:
            definitions.append(part.strip())
    return definitions if len(definitions) > 1 else definitions[0]

def clean_string(cell_value):
    """
    Remove leading/trailing spaces and return empty string if the cell contains only spaces.

    Parameters:
        cell_value (str): The cell value to clean.

    Returns:
        str: Cleaned string.
    """
    if pd.isna(cell_value) or str(cell_value).strip() == "":
        return ""
    return str(cell_value).strip()

def parse_pronunciation(cell_value):
    """
    Split "pronunciation" into "standardPronunciation" (first sequence) and "pronunciationNotes" (notes).

    Parameters:
        cell_value (str): The pronunciation value to parse.

    Returns:
        dict: A dictionary with "standardPronunciation" and "pronunciationNotes" keys.
    """
    if pd.isna(cell_value) or str(cell_value).strip() == "":
        return {"standardPronunciation": "", "pronunciationNotes": ""}

    parts = str(cell_value).strip().split("\u3000", 1)
    standardPronunciation = parts[0].strip()
    pronunciationNotes = parts[1].strip() if len(parts) > 1 else ""

    # Log invalid cases
    if not standardPronunciation:
        print(f"Invalid pronunciation value: {cell_value}")

    return {"standardPronunciation": standardPronunciation, "pronunciationNotes": pronunciationNotes}

def convert_ods_to_json(input_directory, output_directory):
    """
    Convert all ODS files in the input_directory to JSON files and save them in the output_directory.

    Parameters:
        input_directory (str): Path to the directory containing ODS files.
        output_directory (str): Path to the directory to save JSON files.
    """
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    # List all ODS files in the input directory
    ods_files = [f for f in os.listdir(input_directory) if f.endswith('.ods')]

    with tqdm(total=len(ods_files), desc="Converting files") as pbar:
        for ods_file in ods_files:
            input_path = os.path.join(input_directory, ods_file)
            output_path = os.path.join(output_directory, ods_file.replace('.ods', '.json'))

            try:
                # Read the ODS file
                df = pd.read_excel(input_path, engine='odf')

                # Rename columns to English keys
                df.columns = [
                    "id", "term", "partOfSpeech", "termIndexes", "pronunciation", 
                    "definitions", "examples", "similarTerms", "oppositeTerms", "audioFileName"
                ]

                # Clean and parse specific columns
                df["termIndexes"] = df["termIndexes"].apply(parse_multiline_cell)
                df["examples"] = df["examples"].apply(parse_example_cell)
                df["similarTerms"] = df["similarTerms"].apply(parse_similar_terms)
                df["definitions"] = df["definitions"].apply(parse_definitions)
                df["partOfSpeech"] = df["partOfSpeech"].apply(clean_string)
                df["oppositeTerms"] = df["oppositeTerms"].apply(clean_string)
                df["audioFileName"] = df["audioFileName"].apply(clean_string)
                df["pronunciation"] = df["pronunciation"].apply(parse_pronunciation)

                # Convert the DataFrame to a list of dictionaries
                json_data = df.to_dict(orient='records')

                # Save as JSON
                with open(output_path, 'w', encoding='utf-8') as json_file:
                    json.dump(json_data, json_file, ensure_ascii=False, indent=4)

                print(f"Converted: {ods_file} -> {os.path.basename(output_path)}")
            except Exception as e:
                print(f"Error converting {ods_file}: {e}")

            pbar.update(1)

# Example usage
input_directory = "./input_directory"  # Replace with your ODS file directory
output_directory = "./output_directory"  # Replace with your JSON output directory

convert_ods_to_json(input_directory, output_directory)
