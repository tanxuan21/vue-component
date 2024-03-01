export const handleMove = (element, velement, t) => {
    element["translate-x"] = 0;
    element["translate-y"] = 0;
    const beginPos = {
        x: 0,
        y: 0
    };
    const beginTranslate = {
        x: 0,
        y: 0,
    }
    const translate = {
        x: 0,
        y: 0,
    }
    const calcTranslate = (event) => {
        translate.x = (event.clientX - beginPos.x) + element["translate-x"];
        translate.y = (event.clientY - beginPos.y) + element["translate-y"];
    }
    const MovingFrame = (event) => {
        calcTranslate(event);
        t.value.x = translate.x;
        t.value.y = translate.y;
        // const s = `translate(${translate.x}px, ${translate.y}px) scale(${scale.value})`;
        // velement.style.transform = s;
    }
    const beginMove = (event) => {
        // console.log('begin');
        beginPos.x = event.clientX;
        beginPos.y = event.clientY;
        element.addEventListener("mousemove", MovingFrame);
    }
    const moveOut = (event) => {
        // console.log('out');
        element.removeEventListener("mousemove", MovingFrame);
    }
    const endMove = (event) => {
        element["translate-x"] = translate.x;
        element["translate-y"] = translate.y;
        element.removeEventListener("mousemove", MovingFrame);
    }
    element.addEventListener("mousedown", beginMove);
    element.addEventListener("mouseup", endMove);
    element.addEventListener("mouseleave", moveOut);
};