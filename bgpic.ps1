$imagePath = "C:\Users\aiden\Desktop\projects\snailbait\image\background.png"
$outputPath = "C:\Users\aiden\Desktop\projects\snailbait\image\background-mirrored.png"
$mirroredPath = [System.IO.Path]::GetTempFileName()
magick convert $imagePath -flop $mirroredPath
magick convert $imagePath $mirroredPath +append $outputPath
Remove-Item $mirroredPath
