# from app import create_app
# app = create_app()

# if __name__ == '__main__':
#     app.run(debug=True)
    

from server.app import create_app
import os

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)

