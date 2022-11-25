function handle_user_info(files, body) {
    let user_info;
    if (files.length > 0) {
        let file_paths = [];
        for (let i = 0; i < files.length; i++) {
            file_paths.push(files[i].path);
        }
        user_info = {
            ...Object.assign({}, body),
            file_paths
        };
    } else user_info = { ...Object.assign({}, body) };
    return user_info;
}

function handle_delete_user_files(files) {
    if (files.length > 0) {
        const { unlinkSync } = require("fs");
        for(let i = 0; i < files.length; i++) {
            unlinkSync(files[i].path);
        }
    }
}

module.exports = { handle_user_info, handle_delete_user_files };