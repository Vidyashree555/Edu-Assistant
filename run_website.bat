@echo off
echo Starting College Website with Chatbot...
echo.
echo Opening web browser in 3 seconds...
echo You can access the website at: http://localhost:5000
echo.
cd /d "d:\chatbot for college website\collage-chatbot"

:: Start the web browser after a delay
start "" cmd /c "timeout /t 3 /nobreak && start http://localhost:5000"

:: Start the Flask server
"D:/chatbot for college website/collage-chatbot/.venv/Scripts/python.exe" app.py

pause
