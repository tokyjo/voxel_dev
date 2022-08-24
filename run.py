#import app 
#from waitress import serve
from app import app

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)

#waitress-serve --port=8080 --threads=6 app:app