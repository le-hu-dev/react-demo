// https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html
export const data = {"resultCount":1,"results":[{"wrapperType":"track","kind":"song","artistId":909253,"collectionId":879273552,"trackId":879273565,"artistName":"Jack Johnson","collectionName":"In Between Dreams (Bonus Track Version)","trackName":"Better Together","collectionCensoredName":"In Between Dreams (Bonus Track Version)","trackCensoredName":"Better Together","artistViewUrl":"https://itunes.apple.com/us/artist/jack-johnson/909253?uo=4","collectionViewUrl":"https://itunes.apple.com/us/album/better-together/879273552?i=879273565&uo=4","trackViewUrl":"https://itunes.apple.com/us/album/better-together/879273552?i=879273565&uo=4","previewUrl":"https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music6/v4/13/22/67/1322678b-e40d-fb4d-8d9b-3268fe03b000/mzaf_8818596367816221008.plus.aac.p.m4a","artworkUrl30":"https://is1-ssl.mzstatic.com/image/thumb/Music2/v4/a2/66/32/a2663205-663c-8301-eec7-57937c2d0878/source/30x30bb.jpg","artworkUrl60":"https://is1-ssl.mzstatic.com/image/thumb/Music2/v4/a2/66/32/a2663205-663c-8301-eec7-57937c2d0878/source/60x60bb.jpg","artworkUrl100":"https://is1-ssl.mzstatic.com/image/thumb/Music2/v4/a2/66/32/a2663205-663c-8301-eec7-57937c2d0878/source/100x100bb.jpg","collectionPrice":6.99,"trackPrice":1.29,"releaseDate":"2005-03-01T08:00:00Z","collectionExplicitness":"notExplicit","trackExplicitness":"notExplicit","discCount":1,"discNumber":1,"trackCount":15,"trackNumber":1,"trackTimeMillis":207679,"country":"USA","currency":"USD","primaryGenreName":"Rock","isStreamable":true}]}

function loadScript(url) {
  let {lastScript} = loadScript
  let	s = loadScript.lastScript = document.createElement('script');
  s.setAttribute('src', url);
  if(!HTMLScriptElement.prototype.isPrototypeOf(lastScript)){
    loadScript.lastScript = document.head.appendChild(s);
  } else
    document.head.replaceChild(s,lastScript)
}
loadScript.callback = response => {
      console.log(response);
      window.data = response;
}
window.loadScript=loadScript
export function itunesSearch (term,media,callback,limit=10) {
  if(callback&&typeof callback=="function")loadScript.callback=callback
  limit|=0; limit=limit<=0?0:limit
  let query={term: encodeURIComponent(term).replace(/%20/g, '+'),
    media,limit,callback:"loadScript.callback"}
  let url=`https://itunes.apple.com/search?`+
  Object.entries(query).filter(e=>e[1]).map(e=>`${e[0]}=${e[1]}`).join('&')
  //term=${term}&limit=10&callback=loadScript.callback`
  console.log(url)
  loadScript(url)
}