import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';

const ManageSlots = () => {
    const {user} = useAuth()
    const [availableSlots, setAvailableSlots] = useState([]);
    useEffect(() => {
        const fetchAvailableSlots = async () => {
          try {
            const response = await axios.get(`/slots/${user?.email}`);
            if (response.data.success) {
              console.log(response.data.success)
              setAvailableSlots(response.data.slots); // Set slots data
            } else {
              console.error("No slots found for this trainer");
            }
          } catch (error) {
            console.error("Error fetching available slots:", error);
          }
        };
    
        if (user?.email) {
          fetchAvailableSlots();
        }
      }, [user?.email]);
      console.log(availableSlots)
    return (
        <div>
            manage slots
        </div>
    );
};

export default ManageSlots;