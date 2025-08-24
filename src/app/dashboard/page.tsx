import {createServerSupabase} from '../../../lib/supabase/server'  
import { redirect } from 'next/navigation'

export default async function Dashboard() {
    const supabase =  createServerSupabase()
    const {data: {user}, error} = await supabase.auth.getUser()
    console.log(user)
    
    if(!user) {
        redirect('/login')
    }

    return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2">Welcome, {user.email}</p>

      {/* Example: access GitHub info if present in user_metadata */}
      {/* <p>GitHub: {user.user_metadata?.user_name}</p> */}
    </div>
  )
}