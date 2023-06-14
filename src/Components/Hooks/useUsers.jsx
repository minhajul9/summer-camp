
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const useUsers = () => {

    const {user} = useContext(AuthContext)

    const { refetch, data : users = []} = useQuery({
        queryKey: ['users', user.email],
        queryFn: async () => {
            const response = await fetch(`https://summer-camp-server-kohl.vercel.app/user/${user.uid}`);

            return response.json()
        },
      })

      return [users, refetch ]
}

export default useUsers;