import csv
import json

def convert_csv_to_json(csv_file_path, json_file_path):
    """
    Reads a standard CSV file with a header and converts it to a JSON file.
    """
    prompts = []
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        # Use DictReader to treat each row as a dictionary
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            # Map the CSV headers to the desired JSON keys
            prompts.append({
                "business_unit": row.get("Business Unit", ""),
                "title": row.get("Title", ""),
                "role": row.get("Role", ""),
                "description": row.get("Description", ""),
                "prompt": row.get("Prompt", "")
            })

    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(prompts, json_file, indent=2)

if __name__ == "__main__":
    convert_csv_to_json('prompts.csv', 'prompts.json')
