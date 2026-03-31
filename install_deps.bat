@echo off
echo Installing required dependencies for Vision IT Website...
echo This may take 2-3 minutes. Please wait...
echo.

npm install tailwind-merge clsx lucide-react framer-motion axios zod react-hook-form @hookform/resolvers firebase react-hot-toast dayjs zustand @tanstack/react-table

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCCESS] All dependencies installed! 
    echo Now your website should show without errors.
    pause
) else (
    echo.
    echo [ERROR] Installation failed. Please check your internet connection or run the command manually.
    pause
)
