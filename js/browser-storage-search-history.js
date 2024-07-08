$(document).ready(function() {
    // localStorage에서 검색어 목록을 가져옵니다. 없으면 빈 배열로 초기화합니다.
    var savedSearchWords = JSON.parse(localStorage.getItem("searchWords")) || [];

    // 검색어를 localStorage에 저장하고 화면에 표시하는 함수
    function localStorageSearchWord(searchWord) {
        if (searchWord !== "") {
            if (!savedSearchWords.includes(searchWord)) {
                savedSearchWords.push(searchWord);
                localStorage.setItem("searchWords", JSON.stringify(savedSearchWords));
                displaySearchWords(savedSearchWords);
                $(".searchInput").val("");
            }
        }
    }

    // 검색어 목록을 화면에 표시하는 함수
    function displaySearchWords(searchWords) {
        var searchList = $(".searchList");
        searchList.empty();
        if (searchWords.length === 0) {
            searchList.append("<li class='list-group-item'><div class='noRecords'>검색된 기록이 없습니다.</div></li>");
        } else {
            searchWords.forEach(function(searchWord, index) {
                var listItem = $("<li class='list-group-item d-flex justify-content-between align-items-center'></li>");
                var link = $("<span class='me-auto'>" + searchWord + "</span>");
                var deleteButton = $("<button type='button' class='btn-close' aria-label='Close'></button>");

                listItem.append(link);
                listItem.append(deleteButton);

                deleteButton.click(function() {
                    savedSearchWords.splice(index, 1);
                    localStorage.setItem("searchWords", JSON.stringify(savedSearchWords));
                    displaySearchWords(savedSearchWords);
                });

                searchList.append(listItem);
            });
        }
    }

    // 초기화시 저장된 검색어 표시
    displaySearchWords(savedSearchWords);

    // 검색 버튼 클릭 이벤트 처리
    $("#button-addon").click(function() {
        var searchWord = $(".searchInput").val();
        localStorageSearchWord(searchWord);
    });

    // Enter 키 눌림 이벤트 처리
    $(".searchInput").keypress(function(event) {
        if (event.which == 13) { // Enter key pressed
            var searchWord = $(".searchInput").val();
            localStorageSearchWord(searchWord);
        }
    });
});