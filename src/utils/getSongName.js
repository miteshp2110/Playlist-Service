

const getSongName = (url)=>{
    const split = url.split('/')
    return split[split.length -1]
}

module.exports = getSongName