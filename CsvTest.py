import csv

with open('example_input.csv', 'rb') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        print(row['MD5'], row['ClassificationName'], row['ClassificationType'], row['Size'], row['FileType'])
