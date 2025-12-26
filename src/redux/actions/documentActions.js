
import {fetchStart,fetchSuccess,fetchFailure} from '../document';
import { uploadSuccess,uploadFailure, uploadStart } from '../upload';
import { deleteFailure,deleteStart,deleteSuccess } from '../delete';
const BASE_URL="https://documentpod-backend.onrender.com"

//fetching action
export const fetchDocument=()=>{
    return async (dispatch,getState)=>{
        try {
            dispatch(fetchStart());

            const token= getState().auth.token;
            const res = await fetch(`${BASE_URL}/api/files/getfiles`,{
                method:"GET",
                headers:{
                    "auth-token":token,
                },
            });
            if (!res.ok) {
                dispatch(fetchFailure("Failed to load documents"));
                return;
              }
            const data =await res.json();
            dispatch(fetchSuccess(data.files));

            
        }  catch (error) {
            dispatch(fetchFailure("Failed to load documents"));
          }

    };
};

// upload action
export const uploadDocument=(formData)=>{
    return async(dispatch,getState)=>{
        try {
            dispatch(uploadStart());
            const token=getState().auth.token;
            
            console.log('Making upload request to:', `${BASE_URL}/api/files/upload`);
            console.log('Token:', token ? 'exists' : 'missing');
            
            const res=await fetch(`${BASE_URL}/api/files/upload`,{
                method:"POST",
                headers:{
                    "auth-token":token,
                    },
                    body:formData,
                }
            );
            
            console.log('Response status:', res.status);
            console.log('Response ok:', res.ok);
            
            // Handle non-JSON responses (like HTML error pages)
            const contentType = res.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await res.json();
            } else {
                // Server returned HTML error page
                const textResponse = await res.text();
                console.log('Server returned HTML:', textResponse.substring(0, 200));
                data = { error: `Server error (${res.status}): Please check server logs` };
            }
            
            console.log('Response data:', data);
            
            if(!res.ok){
                dispatch(uploadFailure(data.error || `Upload failed with status ${res.status}`))
                return;
            }
            dispatch(uploadSuccess());
            dispatch(fetchDocument());
        } catch (error) {
            console.error('Upload error:', error);
            dispatch(uploadFailure("Network error: " + error.message));
            
        }

    }

}
//delete action
export const deleteDocument=(fileId)=>{
    return async(dispatch,getState)=>{
        try {
            dispatch(deleteStart());
            const token=getState().auth.token;
            const res=await fetch(`${BASE_URL}/api/files/delete/${fileId}`,{
                method:"DELETE",
                headers:{
                    "auth-token":token,
                },
            });
            const data=await res.json();
            if(!res.ok){
                dispatch(deleteFailure(data.error||"Delete Failed !"))
                return;
            }
            dispatch(deleteSuccess());
            dispatch(fetchDocument());
        } catch (error) {
            dispatch(deleteFailure("Something went wrong"));
            
        }
    };
};

