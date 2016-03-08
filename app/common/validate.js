module.exports = {
    normalstring: function(str) {
        return /[0-9]|[a-zA-Z]|[\u4e00-\u9fa5]]/.test(str);
    },
    emptystring: function(str) {
        return /^\s*$/.test(str);
    },
    isTel: function(str) {
        return /^1[3|4|5|7|8]\d{9}$/.test(str);
    }
}