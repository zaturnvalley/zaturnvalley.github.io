
function removeStopwords(jobDescription) {
	var stopwords = "a, able, about, across, after, all, almost, also, am, among, an, and, any, are, as, at, be, because, been, but, by, can, cannot, could, dear, did, do, does, either, else, ever, every, for, from, get, got, had, has, have, he, her, hers, him, his, how, however, i, if, in, into, is, it, its just, least, let, like, likely, may, me, might, most, must, my, neither, no, nor, not, of, off, often, on, only, or, other, our, own, rather, said, say, says, she, should, since, so, some, than, that, the, their, them, then, there, these, they, this, tis, to, too, us, wants, was, we, were, what, when, where, which, while, who, whom, why, will, with, would, yet, you, your, arent, cant, couldve, couldnt, hell, hes, id, isnt, mustve, mustnt, its, shell, shes, shouldnt, shouldve, thatll, thats, theres, theyd, theyll, theres, youd, youll, youre, youve";
    var allWordArr = jobDescription.match(/\w+/g);
    var stopwordsObj = {};
    var keywordArr = [];
    
    stopwords = stopwords.split(',');
    for (var i = 0; i < stopwords.length; i++ ) {
        stopwordsObj[ stopwords[i].trim() ] = true;
    }
    
    for (i = 0; i < allWordArr.length; i++ ) {
        var word = allWordArr[i].trim().toLowerCase();
        if ( !stopwordsObj[word] ) {
            keywordArr.push(word);
        }
    }
    console.log(keywordArr);
    return keywordArr;
}

function wordFrequency(arr) {
    var wordObj = [];
    var prev;
    
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            wordObj.push({
             text: arr[i],
             weight: 1
            });
        } else {
            wordObj[wordObj.length-1].weight++;
        }
        prev = arr[i];
    }
    console.log(wordObj);
    return wordObj;
}

