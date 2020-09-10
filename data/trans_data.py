import os
import csv
import json

current_path = os.path.dirname(os.path.realpath(__file__))
print(current_path)
os.chdir(current_path)

with open('./word_data.csv', 'r', encoding='utf-8') as file:
    lines_list = csv.reader(file)

    words_dict = {}
    for line in lines_list:
        if line[1] != '명':
            continue
        word_dict = {'word': line[0], 'class': line[1]}
        