import React from "react";

export const ProfileEditForm = ({usuario}) => {
  return (
    <div className="profile_edit_form-container">
      <div className="profile_edit_form-photo">
        <img
          src={usuario.photo}
          alt="profile"
          width={100}
          height={100}
        />
        <button>Change photo</button>
        <button>Remove photo</button>
      </div>
      <div className="profile_edit_form-inputs">
        <form action="" className="forms">

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" placeholder="Name" value={usuario.name} />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last name:</label>
              <input type="text" placeholder="Last name" value={usuario.lastname} />
            </div>
          </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder="Email" value={usuario.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Username:</label>
                    <input type="tel" placeholder="Phone" value={usuario.username} />
                </div>
            </div>
                <textarea name="bio" id="" className="edit_bio">
                    Bio: 
                </textarea>
          <button>Save</button>
          
        </form>
      </div>
    </div>
  );
};
