

const useDragHook = () => {
    const drag = (event: React.DragEvent<HTMLDivElement>) => {
        const target = event.currentTarget as HTMLElement; // Assert type
        event.dataTransfer.setData("text", target.id);
    };

    const drop = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");

        const target = ev.currentTarget as HTMLElement; // Assert type
        const draggedElement = document.getElementById(data);

        if (draggedElement) {
            target.appendChild(draggedElement);
        }
    };

    const allowDrop = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
    };
    return {
        drop, drag, allowDrop
    }

}

export default useDragHook