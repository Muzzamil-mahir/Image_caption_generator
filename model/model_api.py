import requests
from PIL import Image
from IPython.display import display 
import io
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import BlipProcessor, BlipForConditionalGeneration

#Loading
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")


app = Flask(__name__)
CORS(app)
@app.route('/GC', methods=['POST'])
def Caption_Generator():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    #unpack and process the image to pass to blip
    file = request.files['image']
    file_stream = io.BytesIO(file.read())
    image = Image.open(file_stream).convert('RGB')

    # conditional image captioning
    try:
        text = "a photography of"
        inputs = processor(image, text, return_tensors="pt")
        out = model.generate(**inputs, max_length = 15)
        cap = processor.decode(out[0], skip_special_tokens=True)
    except Exception as e:
        print(f"An error when Image Captioning:\t{e}")
    
    return jsonify({'caption': cap}), 200

if __name__ == '__main__':
    app.run(debug=True)
