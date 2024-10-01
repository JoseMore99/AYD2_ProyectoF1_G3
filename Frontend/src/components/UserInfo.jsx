import React from 'react';

const UserInfo = ({ user }) => {
    return (
        <div className='container'>
            <div class="card border-light mb-3" >
                <div class="card-header"><p><strong>ID:</strong> {user.id}</p></div>
                <div class="card-body">
                    <p><strong>Email:</strong> {user.correo}</p>
                    <p><strong>Full Name:</strong> {user.nombre_completo}</p>
                    <p><strong>Phone Number:</strong> {user.numero_telefono}</p>
                    <p><strong>Gender:</strong> {user.genero}</p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;