
import {fetchStart,fetchSuccess,fetchFailure} from '../document';
import { uploadSuccess,uploadFailure, uploadStart } from '../upload';
import { deleteFailure,deleteStart,deleteSuccess } from '../delete';
import { apiCache } from '../../utils/apiCache';

const BASE_URL = process.env.REACT_APP_API_URL || "https://documentpod-backend.onrender.com";
const DOCUMENT_CACHE_TTL = parseInt(process.env.REACT_APP_DOCUMENT_CACHE_TTL) || 180000; // 3 minutes

//fetching action with caching
export const fetchDocument=()=>{
    return async (dispatch,getState)=>{
        try {
            // Check cache first
            const cacheKey = `documents_${getState().auth.token?.slice(-10)}`;
            const cachedData = apiCache.get(cacheKey);
            
            if (cachedData) {
                dispatch(fetchSuccess(cachedData));
                return;
            }

            dispatch(fetchStart());
            const token= getState().auth.token;
            
            const controller = new AbortController();
            
            const res = await fetch(`${BASE_URL}/api/files/getfiles`,{
                method:"GET",
                headers:{
                    "auth-token":token,
                },
                signal: controller.signal
            });
            
            if (!res.ok) {
                dispatch(fetchFailure("Failed to load documents"));
                return;
            }
            
            const data = await res.json();
            
            // Cache the response
            apiCache.set(cacheKey, data.files, DOCUMENT_CACHE_TTL);
            
            dispatch(fetchSuccess(data.files));

        } catch (error) {
            if (error.name === 'AbortError') {
                dispatch(fetchFailure("Request cancelled. Please try again."));
            } else {
                dispatch(fetchFailure("Failed to load documents"));
            }
        }
    };
};

// upload action with cache invalidation
export const uploadDocument=(formData)=>{
    return async(dispatch,getState)=>{
        try {
            dispatch(uploadStart());
            const token=getState().auth.token;
            
            const controller = new AbortController();
            
            const res=await fetch(`${BASE_URL}/api/files/upload`,{
                method:"POST",
                headers:{
                    "auth-token":token,
                },
                body:formData,
                signal: controller.signal
            });
            
            const contentType = res.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await res.json();
            } else {
                // eslint-disable-next-line no-unused-vars
                const textResponse = await res.text();
                data = { error: `Server error (${res.status}): Please check server logs` };
            }
            
            if(!res.ok){
                dispatch(uploadFailure(data.error || `Upload failed with status ${res.status}`))
                return;
            }
            
            // Clear cache after successful upload
            const cacheKey = `documents_${token?.slice(-10)}`;
            apiCache.delete(cacheKey);
            
            dispatch(uploadSuccess());
            dispatch(fetchDocument());
        } catch (error) {
            if (error.name === 'AbortError') {
                dispatch(uploadFailure("Upload cancelled. Please try again."));
            } else {
                dispatch(uploadFailure("Network error: " + error.message));
            }
        }
    }
}
//delete action with cache invalidation
export const deleteDocument=(fileId)=>{
    return async(dispatch,getState)=>{
        try {
            dispatch(deleteStart());
            const token=getState().auth.token;
            
            const controller = new AbortController();
            
            const res=await fetch(`${BASE_URL}/api/files/delete/${fileId}`,{
                method:"DELETE",
                headers:{
                    "auth-token":token,
                },
                signal: controller.signal
            });
            
            const data=await res.json();
            if(!res.ok){
                dispatch(deleteFailure(data.error||"Delete Failed !"))
                throw new Error(data.error || "Delete Failed!");
            }
            
            // Clear cache after successful delete
            const cacheKey = `documents_${token?.slice(-10)}`;
            apiCache.delete(cacheKey);
            
            dispatch(deleteSuccess());
            return Promise.resolve();
        } catch (error) {
            if (error.name === 'AbortError') {
                dispatch(deleteFailure("Delete cancelled. Please try again."));
            } else {
                dispatch(deleteFailure("Something went wrong"));
            }
            throw error;
        }
    };
};

