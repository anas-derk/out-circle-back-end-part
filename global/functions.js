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

function handle_delete_files(file_paths) {
    if (file_paths.length > 0) {
        const { unlinkSync } = require("fs");
        for(let i = 0; i < file_paths.length; i++) {
            unlinkSync(file_paths[i]);
        }
    }
}

module.exports = {
    handle_user_info,
    handle_delete_user_files,
    handle_delete_files,
};