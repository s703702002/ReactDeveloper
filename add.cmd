@echo off
if [%1] == [] goto Empty
goto Create

:Empty
    echo 'please input folder name'
    goto :eof

:Create
    xcopy _template %cd%\components\%1 /D /E /C /R /I /K /Y /F
    echo 'Create Finish!'