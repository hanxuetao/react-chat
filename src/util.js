export function getRedirectPath({type, avatar}) {
    //根据用户 返回跳转地址
    //user.type /boss /genius
    //user.avatar /bossinfo /geniusinfo
    let url = (type==='boss')?'/boss':'/genius'
        if(!avatar) {
            url += 'info'
        }
        return url
}