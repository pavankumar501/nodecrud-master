function addUser(){
            
    window.location.href = '/customers/add';
}
function cancelAdd(){
    
    window.location.href = 'http://localhost:4300/datatable.html';
}

function delUser(){
    window.location.href = '/customers/delete/:id';
}

function editUser(){
    window.location.href = '/customers/edit/:id';
}


