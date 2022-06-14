import moment from 'moment'
export function formatDate(val) {
    return moment(val).format("YYYY-MM-DD")
}