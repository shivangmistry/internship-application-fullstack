var countA = 0;
var countB = 0;

class LinkHandler{
  element(element) {
    element.setAttribute('href', 'https://www.linkedin.com/in/shivang-mistry-14118317a/')
    element.setInnerContent('Visit Shivang\'s Profile')
  }
}

const REWRITER = new HTMLRewriter()
  .on('a#url', new LinkHandler());

function getRandomUrl() {
  if (countA===countB) {
      const pick = Math.floor(Math.random()*2);
      if (pick===0) {
        countA += 1
      } else {
        countB += 1;
      }
      return pick
    } else if(countA<countB) {
      countA += 1
      return 0
    } else {
      countB += 1;
      return 1
    }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request, URL="https://cfw-takehome.developers.workers.dev/api/variants") {
  const BASEURL="https://cfw-takehome.developers.workers.dev/api/variants";

  let response =  await fetch(URL);

  if(URL===BASEURL && response.status===200) {
    let data = await response.json();
    
    // requirement 1 - saving array response to a vairable
    const urls = data.variants;
    console.log(countA, countB);
    
    // requirement 2 and 3
    pick = getRandomUrl();
    return handleRequest(request, urls[pick]);
  }
  else {
    return REWRITER.transform(response);
  }
}
