export function formatDate(dateString: string, isShort: boolean, hasYear: boolean = true): string {
    const date = new Date(dateString);
    let months;
    if(isShort) {
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }else {
        months =  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let formattedDate = `${month} ${day}`;
    if(hasYear) {
        formattedDate += `, ${year}`
    }
    return formattedDate;
}