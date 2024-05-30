export interface Announcement extends Pick<SiteStatus, 'status' | 'message'> {
  /**
   * The id of the announcement
   */
  id: string;
}

export default Announcement;
