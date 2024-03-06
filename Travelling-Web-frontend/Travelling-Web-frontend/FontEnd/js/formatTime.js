const formatTime = (time) => {
    let minusTime = new Date().getTime() - new Date(time).getTime();
    if(minusTime/1000 < 60){
        return Math.floor(minusTime/1000) + ' seconds ago';
    }
    if(minusTime/60000 < 60){
        return Math.floor(minusTime/60000) + ' minutes ago';
    }
    if(minusTime/3600000 < 24){
        return Math.floor(minusTime/3600000) + ' hours ago';
    }
    if(minusTime/86400000 < 7){
        return Math.floor(minusTime/86400000) + ' days ago';
    }
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
}