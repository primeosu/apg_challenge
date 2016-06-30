__author__ = "DMcHale"

import csv
from sqlite3 import connect

from flask import Flask, render_template, request
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)


@app.route('/')
def index():
    definitionsList = []
    classificationTypes = []

    try:
        conn = connect('example.db', check_same_thread=False)

    except Exception as e:
        print "Unable to connect to 'example.db'"

    c = conn.cursor()

    try:
        for row in c.execute('SELECT * FROM definitions ORDER BY classificationType'):
            definitionsList.append(row)
    except Exception as e:
        print('Could not retrieve definitions from definitions table')
        print(e)

    try:
        for row in c.execute(
                'SELECT classificationType, COUNT(classificationType) FROM definitions GROUP BY classificationType'):
            classificationTypes.append(row)
    except Exception as e:
        print(e)

    return render_template('index.html',
                           definitionsList=definitionsList,
                           classificationTypes=classificationTypes)


@app.route('/handleUpload', methods=['POST'])
def handle_upload():
    error = None
    if request.method == 'POST':
        upload_file = request.files['file']
        definitions = []
        definitionsList = []
        classificationTypes = []

        try:
            conn = connect('example.db', check_same_thread=False)
        except Exception as e:
            print "Unable to connect to 'example.db'"

        c = conn.cursor()

        with open(upload_file.filename, 'rb') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row.has_key(''):
                    row.pop('')
                definitions.append(row)

        for entry in definitions:
            definitionsList.append((entry['MD5'], entry['ClassificationName'], entry['ClassificationType'],
                                    entry['Size'], entry['FileType']))

        try:
            c.executemany('INSERT INTO definitions VALUES (?,?,?,?,?)', definitionsList)
            conn.commit()
        except Exception as e:
            print('Could not insert definitions into definitions table')
            print(e)

        try:
            for row in c.execute('SELECT * FROM definitions ORDER BY classificationType'):
                definitionsList.append(row)
        except Exception as e:
            print('Could not retrieve definitions from definitions table')
            print(e)

        try:
            for row in c.execute(
                    'SELECT classificationType, COUNT(classificationType) FROM definitions GROUP BY classificationType'):
                classificationTypes.append(row)
        except Exception as e:
            print(e)

        return render_template('index.html',
                               definitionsList=definitionsList,
                               classificationTypes=classificationTypes)
    else:
        return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
