import React from "react";
import { ImBin, GrEdit } from "../icons";
import TogglePublish from "./TogglePublish";

function VideoTable({ videos, setPopUp, setVideoDetails }) {
  return (
    <>
      <section className="mx-auto w-full overflow-x-scroll">
        <table className="min-w-full border border-slate-500">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-slate-500">
                Toggle Publish
              </th>
              <th className="py-2 px-4 border-b border-slate-500">Status</th>
              <th className="py-2 px-4 border-b border-slate-500">Uploaded</th>
              <th className="py-2 px-4 border-b border-slate-500">Views</th>
              <th className="py-2 px-4 border-b border-slate-500">
                Date Uploaded
              </th>
              <th className="py-2 px-4 border-b border-slate-500"></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {videos?.map((video) => (
              <tr key={video?._id}>
                <td className="py-2 px-4 border-b border-slate-500">
                  <TogglePublish
                    isPublished={video?.isPublished}
                    videoId={video?._id}
                  />
                </td>
                <td className="py-2 px-4 border-b border-slate-500 ">
                  {video?.isPublished ? (
                    <span className="text-green-500 py-1 px-2 border border-green-500 rounded-full">
                      Published
                    </span>
                  ) : (
                    <span className="text-orange-500 py-1 px-2 border border-orange-500 rounded-full">
                      UnPublished
                    </span>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-slate-500">
                  {video?.title}
                </td>
                <td className="border-b border-slate-500">
                  <span className="border rounded-lg outline-none px-2 bg-green-200 text-green-600">
                    {video?.views} views
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-slate-500">
                  {video.createdAt.substr(0, 10)}
                </td>
                <td className="py-2 border-b border-slate-500">
                  <span className="flex gap-3 justify-start">
                    <ImBin
                      size={20}
                      className="cursor-pointer hover:text-purple-500"
                      onClick={() => {
                        setPopUp((prev) => ({
                          ...prev,
                          deleteVideo: !prev.deleteVideo,
                        }));
                        setVideoDetails(video);
                      }}
                    />
                    <GrEdit
                      size={20}
                      className="cursor-pointer hover:text-purple-500"
                      onClick={() => {
                        setPopUp((prev) => ({
                          ...prev,
                          editVideo: !prev.editVideo,
                        }));
                        setVideoDetails(video);
                      }}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default VideoTable;
