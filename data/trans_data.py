import os
import csv
import json

current_path = os.path.dirname(os.path.realpath(__file__))
print(current_path)
os.chdir(current_path)

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