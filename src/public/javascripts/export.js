"use strict";

const exportService = (function () {
    function exportSubTree(noteId) {
        const url = utils.getHost() + "/api/export/" + noteId + "?protectedSessionId="
            + encodeURIComponent(protected_session.getProtectedSessionId());

        utils.download(url);
    }

    let importNoteId;

    function importSubTree(noteId) {
        importNoteId = noteId;

        $("#import-upload").trigger('click');
    }

    $("#import-upload").change(async function() {
        const formData = new FormData();
        formData.append('upload', this.files[0]);

        await $.ajax({
            url: baseApiUrl + 'import/' + importNoteId,
            headers: server.getHeaders(),
            data: formData,
            type: 'POST',
            contentType: false, // NEEDED, DON'T OMIT THIS
            processData: false, // NEEDED, DON'T OMIT THIS
        });

        await treeService.reload();
    });

    return {
        exportSubTree,
        importSubTree
    };
})();