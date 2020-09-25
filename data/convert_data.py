import os
import csv
import json

with open('./word_data.csv', 'r', encoding='utf-8') as file:
    lines_list = csv.reader(file)

    words_set = set()
    for line in lines_list:
        if line[1] != '명':
            continue
        line[0] = ''.join(i for i in line[0] if not i.isdigit())
        words_set.add(line[0])

    words_list = list(words_set)
    print(words_list)

with open('./word_data.json', 'w', encoding='utf-8') as out_file:
    words_json = json.dumps(words_list, indent=2, ensure_ascii=False)
    out_file.write(words_json)