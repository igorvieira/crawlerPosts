
var Blog = Backbone.Model.extend({
	defaults: {
		author: '',
		title: '',
		url: ''
	}
});

// Backbone Collection

var Blogs = Backbone.Collection.extend({});


// instantiate a Collection

var blogs = new Blogs();


var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
    events:{
        'click .edit-blog':'edit'
    },
    edit:function(){
        $('.edit-blog')
    },
	initialize: function() {
		this.template = _.template($('.blogs-list-template').html());
	},
    render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});



var BlogsView = Backbone.View.extend({
	model: blogs,
	el: $('.blogs-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
    },
    render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog) {
			self.$el.append((new BlogView({model: blog})).render().$el);
		});
		return this;
	}
});

var blogsView = new BlogsView();

$(document).ready(function() {
	$('.add-blog').on('click', function() {
		var blog = new Blog({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			url: $('.url-input').val()
		});
		$('.author-input').val('');
		$('.title-input').val('');
		$('.url-input').val('');
		console.log(blog.toJSON());
		blogs.add(blog);
	})
})

