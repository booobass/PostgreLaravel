import api from "@/lib/axios"

export const DeleteOrder = (onDeleted?: () => void) => {
    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/api/order/${id}`,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                }
            )
            alert("削除しました")
            if(onDeleted) onDeleted()
        } catch {
            alert("権限がありません")
        }
    }

    return {handleDelete}
}