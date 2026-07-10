from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['tienda_online']

@app.route('/api/productos/buscar', methods=['GET'])
def buscar_productos():
    termino = request.args.get('q', '')
    productos = list(db.productos.find({"nombre": {"$regex": termino, "$options": "i"}}))
    for p in productos:
        p['_id'] = str(p['_id'])
    return jsonify(productos)

if __name__ == '__main__':
    app.run(port=5000)