import { useEffect, useState } from "react";
import { useAtom } from "jotai"
import { roleAtom } from "~/atoms"
const useRole = () => {
  const [role, setRole] = useAtom(roleAtom);
  const [isAttendant, setIsAttendant] = useState(false)
  const [isUser, setIsUser] = useState(true)
  useEffect(() => {
    const roleIsUser = role === "USER";
    setIsUser(roleIsUser)
    setIsAttendant(!roleIsUser)
  }, [role])

  return { role, setRole, isAttendant, isUser }
}
export default useRole;
