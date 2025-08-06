import csv
import json

def clean_csv_to_json(csv_file_path, json_file_path):
    prompts = []
    current_business_unit = ""

    with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        
        # Skip initial header rows
        for _ in range(3):
            next(reader)

        for row in reader:
            # Check for business unit row
            if row[0] and not row[1] and not row[2] and not row[3]:
                current_business_unit = row[0]
                # Skip the header row for the prompts
                next(reader)
                continue

            # Stop if we reach the end of the data
            if row == ['0', '0', '0', '0']:
                break

            # Process a prompt row
            if len(row) == 4 and all(row):
                title, role, description, prompt_text = row
                prompts.append({
                    "business_unit": current_business_unit,
                    "title": title,
                    "role": role,
                    "description": description,
                    "prompt": prompt_text
                })

    with open(json_file_path, 'w', encoding='utf-8') as jsonfile:
        json.dump(prompts, jsonfile, indent=2)

if __name__ == "__main__":
    clean_csv_to_json('prompts.csv', 'prompts.json')
