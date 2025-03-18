const mm = require('music-metadata');

async function getSongDuration(filePath) {
  try {
    // Parse the audio file metadata
    const metadata = await mm.parseFile(filePath);
    
    // The duration is provided in seconds
    const duration = metadata.format.duration;

    return duration;
  } catch (error) {
    console.error('Error reading metadata:', error.message);
    return null;
  }
}

module.exports = getSongDuration
