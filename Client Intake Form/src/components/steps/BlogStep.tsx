
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";

export function BlogStep() {
    const { register, control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "blogPosts"
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Blog Content</h2>
                <p className="text-blue-200/70">Add recent articles to display on the blog page.</p>
            </div>

            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300 group">
                        <div className="absolute right-4 top-4">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-950/30"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label>Post Title</Label>
                                <Input {...register(`blogPosts.${index}.title`)} placeholder="e.g. 5 Tips for Better Pool Care" className="bg-black/20 border-white/10 focus:border-blue-500" />
                            </div>

                            <div className="space-y-2">
                                <Label>Excerpt / Summary</Label>
                                <Input {...register(`blogPosts.${index}.excerpt`)} placeholder="A short description..." className="bg-black/20 border-white/10 focus:border-blue-500" />
                            </div>

                            <div className="space-y-2">
                                <Label>Thumbnail URL (Optional)</Label>
                                <Input {...register(`blogPosts.${index}.thumbnailUrl`)} placeholder="https://..." className="bg-black/20 border-white/10 focus:border-blue-500" />
                            </div>
                        </div>
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ title: "", excerpt: "", thumbnailUrl: "" })}
                    className="w-full border-dashed border-white/20 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-950/20"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Blog Post
                </Button>
            </div>
        </div>
    );
}
