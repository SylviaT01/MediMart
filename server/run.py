import os
from app import create_app
app = create_app()

# if __name__ == '__main__':
#     app.run(debug=True)
    
if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))

