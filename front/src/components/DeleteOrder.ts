import api from "@/lib/axios"

export const DeleteOrder = () => {
    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/api/order/${id}`,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                }
            )
            alert("削除しました")
        } catch {
            alert("削除出来ません")
        }
    }

    return {handleDelete}
}