import pandas as pd
import json

# Load Excel file
excel_file = 'dishes.xlsx'  # Change to your file path
sheet_name = 'Giligans'  # Change to your sheet name
df = pd.read_excel(excel_file, sheet_name=sheet_name)

# Convert DataFrame rows to list of dictionaries (JSON objects)
json_list = df.to_dict(orient='records')

# Write to dishes.json
with open('dishes.json', 'w', encoding='utf-8') as f:
    json.dump(json_list, f, indent=2, ensure_ascii=False, default=str)

print("dishes.json file created.")